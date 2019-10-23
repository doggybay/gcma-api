const { Model } = require('objection')

class TeeTime extends Model {
  static get tableName() {
    return 'tee_times'
  }

  static get relationMappings() {
    const Customer = require('./Customer')
    return {
      customers: {
        relation: Model.ManyToManyRelation,
        modelClass: Customer,
        join: {
          from: 'tee_times.id',
          through: {
            from: 'customers_tee_times.tee_time_id',
            to: 'customers_tee_times.tee_time_id',
          },
          to: 'customers.id'
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['time'],

      properties: {
        id: { type: 'integer' },
        time: { type: 'string' }
      }
    }
  }
  
}