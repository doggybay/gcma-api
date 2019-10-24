const { Model } = require('objection')

class Customer extends Model {
  static get tableName() {
    return 'customers'
  }

  static get relationMappings() {
    const Tee_Time = require('./Tee_Time')
    return {
      tee_times: {
        relation: Model.ManyToManyRelation,
        modelClass: Tee_Time,
        join: {
          from: 'customers.id',
          through: {
            from: 'customers_tee_times.customer_id',
            to: 'customers_tee_times.tee_time_id'
          },
          to: 'tee_times.id'
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'company', 'email', 'phone', 'address'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        company: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        phone: { type: 'string', minLength: 1, maxLength: 255 },
        address: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

}

module.exports = Customer

