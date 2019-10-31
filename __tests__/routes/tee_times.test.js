const request = require("supertest");
const { app } = require("../../server");
const knex = require("../../db/knex");
const Tee_Time = require('../../models/Tee_Time')

describe('the tee_times entity routes', () => {
  beforeEach(done => {
    return knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        knex.seed.run().then(() => {
          done()
        })
      })
    })
  })

  afterEach(done => {
    return knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        knex.seed.run().then(() => {
          done()
        })
      })
    })
  })

  describe('get all teetimes', () => {
    it('should fetch all the customers successfully', async () => {
      const res = await request(app).get('/api/teetimes')

      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(300)
    })
  })

  describe('get one teetime', () => {
    it('should fetch one customer successfully', async () => {
      const id = 10
      const res = await request(app).get(`/api/teetimes/${id}`)

      expect(res.status).toEqual(200)
      expect(res.body.id).toHaveProperty('id')
      expect(res.body.id).toHaveProperty('name')
      expect(res.body.id).toHaveProperty('address')
      expect(res.body.id).toHaveProperty('company')
      expect(res.body.id).toHaveProperty('email')
      expect(res.body.id).toHaveProperty('phone')
      expect(res.body.id).toHaveProperty('created_at')
      expect(res.body.id).toHaveProperty('updated_at')
    })
  })

  describe('add a new customer', () => {
    it('should add one new customer successfully', async () => {
      const newCustomer = {
        name: "Luke Duke",
        company: "MARS",
        email: "lucduk@mars.com",
        phone: "+1 (894) 530-2979",
        address: "412 Meadow Street, Matheny, Maryland, 4085"
      }
      const res = await request(app).post('/api/customers').send(newCustomer)

      expect(res.status).toEqual(200)
      expect(res.body.id).toHaveProperty('id')
      expect(res.body.id).toHaveProperty('created_at')
      expect(res.body.id).toHaveProperty('updated_at')
    })
  })

  describe('update one existing customer', () => {
    it('should update one existing customer successfully', async () => {
      const id = 300
      const updatedCustomer = {
        name: "Applesauce"
      }

      const res = await request(app).patch(`/api/customers/${id}`).send(updatedCustomer)

      expect(res.status).toEqual(200)
      expect(res.body.name).toEqual('Applesauce')

      const customers = await knex('customers')
      const expectedCustomer = customers.find(cust => cust.id === id)
      expect(expectedCustomer.name).toEqual("Applesauce")
    })
  })

  describe('remove one customer', () => {
    it('should remove one customer successfully', async () => {
      const id = 2
      const res = await request(app).delete(`/api/customers/${id}`)

      expect(res.status).toEqual(200)
      expect(res.body.name).toEqual("Lucas Duke")

      const customers = await knex('customers')
      expect(customers).toHaveLength(299)
    })
  })

})