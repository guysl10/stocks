export enum eFormItemType {
    TEXT= 'text',
    TEXTAREA= 'textarea',
    PASSWORD = 'password',
    EMAIL = 'email',
    SELECT = 'select',
    CHECKBOX = 'checkbox',
}

interface IOptions {
    label: string,
    value: string
}
export interface IFormItem {
    label: string,
    name: string,
    type: eFormItemType,
    required: boolean,
    pattern?: RegExp,
    placeholder?: string
    options?: Array<IOptions>
}
