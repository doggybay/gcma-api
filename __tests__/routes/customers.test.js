const request = require("supertest");
const { app } = require("../../server");
const knex = require("../../db/knex");
const knexCleaner = require("knex-cleaner");

describe('the customers entity routes', () => {
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
      done()
    })
  })

  describe('get all customers', () => {
    it('should fetch all the customers successfully', async () => {
      const res = await request(app).get('/api/customers')

      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(300)
    })
  })

  describe('get one customer', () => {
    it('shoule fetch one customer successfully', async () => {
      const id = 10
      const res = await request(app).get(`/api/customers/${id}`)

      expect(res.status).toEqual(200)
      expect(res.body.id).toEqual(10)
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
      expect(res.body.name).toEqual('Luke Duke')
    })
  })

  describe('update one existing customer', () => {
    it('should update one existing customer successfully', async () => {
      const id = 1
      const updatedCustomer = {
        "name": "Jhonny Appleseed",
        "company": "Applesauce"
      }
      
      const res = await request(app).patch(`/api/customers/${id}`).send(updatedCustomer)

      expect(res.status).toEqual(200)
      expect(res.body.company).toEqual('Applesauce')

      const customers = await knex('customers')
      expect(customers.name).toEqual('Jhonny Appleseed')
    })
  })

  describe('remove one customer', () => {
    it('should remove one customer successfully', async () => {
      const id = 2
      const res = await request(app).delete(`/api/customers/${id}`)

      expect(res.status).toEqual(200)
      expect(res.body[0].name).toEqual("Lucas Duke")

      const customers = await knex('customers')
      expect(customers.id).toEqual(3)
    })
  })

})