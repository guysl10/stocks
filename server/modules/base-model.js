class BaseModel {
  constructor() {
    this.defaultParams = {
      createdAt: { type: Date, default: new Date().getTime() },
      updatedAt: { type: Date, default: new Date().getTime() },
      createdBy: { type: String, ref: 'User' },
      updatedBy: { type: String, ref: 'User' },
      isDeleted: { type: Boolean, default: false }
    };
  }

  getSchema({ schemaName, params, virtualParams = {}, options }) {
    try {
      return global.Mongoose.model(schemaName);
    } catch (e) {
      const schema = new global.Mongoose.Schema(params, { ...options, versionKey: false });
      // eslint-disable-next-line guard-for-in
      for(const param in virtualParams) {
        schema.virtual(param).get(virtualParams[param].get);
      }
      schema.set('toObject', { virtuals: true });
      return global.Mongoose.model(schemaName, schema);
    }
  }
}
module.exports = BaseModel;
