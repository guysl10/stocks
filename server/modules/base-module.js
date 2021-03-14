const validator = require('../helper/validator');
const userRoles = require('./users/user-roles');
const utils = require('../helper/utils');
const { EXCEPTIONS } = require('../helper/exceptions');
const { DEFALUT_ROW_COUNT, SORT_DIRECTIONS, SORT_DIRECTIONS_MONGOOSE } = require('../helper/constants');
const UserModel = require('./users/user.model');
const moment = require('moment');

class BaseModule {
  constructor() {
    this.validator = validator;
    this.Exception = global.Exception;
    this.EXCEPTIONS = EXCEPTIONS;
    this.userRoles = userRoles;
    this.io = global.io;
    this.utils = utils;
  }

  initIo() {
    this.io = global.io;
  }

  getDefaultCreateFields(req) {
    return { createdBy: req.user._id, updatedBy: req.user._id };
  }

  getDefaultUpdateFields(req) {
    return { updatedBy: req.user._id, updatedAt: new Date().getTime() };
  }

  isAdmin(req) {
    return req.user.Role.Name === 'Admin';
  }

  async setCreatedUpdatedAtFilters({ query: { createdAt, updatedAt }, searchQuery }) {
    createdAt = this.utils.parseJSON(createdAt);
    updatedAt = this.utils.parseJSON(updatedAt);
    if(createdAt.dateFrom) {
      const fromDate = moment(`${createdAt.dateFrom} ${createdAt.timezone}`)
        .startOf('day').toDate();
      const toDate = moment(`${createdAt.dateTo} ${createdAt.timezone}`)
        .endOf('day').toDate();
      searchQuery.createdAt = { $gte: fromDate, $lte: toDate };
    }
    if(updatedAt.dateFrom) {
      const fromDate = moment(`${updatedAt.dateFrom} ${updatedAt.timezone}`)
        .startOf('day').toDate();
      const toDate = moment(`${updatedAt.dateTo} ${updatedAt.timezone}`)
        .endOf('day').toDate();
      searchQuery.updatedAt = { $gte: fromDate, $lte: toDate };
    }
  }

  async setCreateUpdateByFilters({ query: { createdBy, updatedBy }, searchQuery }) {
    if(createdBy) {
      const matchedCreatedByUserIds = (await UserModel.find({
        $or: [
          { firstName: new RegExp(createdBy, 'i') },
          { lastName: new RegExp(createdBy, 'i') },
        ]
      }).lean()).map(records=>records._id);
      searchQuery['createdBy'] = { $in: matchedCreatedByUserIds };
    }
    if(updatedBy) {
      const matchedUpdatedByUserIds = (await UserModel.find({
        $or: [
          { firstName: new RegExp(updatedBy, 'i') },
          { lastName: new RegExp(updatedBy, 'i') },
        ]
      }).lean()).map(records=>records._id);
      searchQuery['updatedBy'] = { $in: matchedUpdatedByUserIds };
    }
  }

  async getRecordList({ query, searchQuery, dbModel }) {
    let { page, rows, sortBy, sortDirection } = query;
    page = parseInt(query.page) || 1;
    rows = parseInt(query.rows) || DEFALUT_ROW_COUNT;
    sortBy = query.sortBy || 'CreatedAt';
    sortDirection = query.sortDirection || SORT_DIRECTIONS_MONGOOSE.DESC;
    const currentPage = parseInt(page);
    await this.setCreateUpdateByFilters({ query, searchQuery });
    this.setCreatedUpdatedAtFilters({ query, searchQuery });
    const totalCount = await dbModel.countDocuments(searchQuery);
    const dbQuery = dbModel.find(searchQuery).limit(rows).skip((currentPage - 1)  * rows)
      .populate('userId', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .populate('orderItems.productId').lean();
    if(sortBy) {
      dbQuery.sort({ [sortBy]:
        sortDirection === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS_MONGOOSE.ASC : SORT_DIRECTIONS_MONGOOSE.DESC
      });
    }
    const returnValue = {
      totalCount,
      page: currentPage,
      totalPages: Math.ceil(totalCount / rows) || 0,
      records: await dbQuery.exec()
    };
    return returnValue;
  }

  validateDateRange({ startDate, endDate }) {
    if(this.validator.isValidTimeStamp({ timeStamp: startDate })) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid start date.');
    }
    if(this.validator.isValidTimeStamp({ timeStamp: endDate })) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid end date.');
    }
  }
}

module.exports = BaseModule;
