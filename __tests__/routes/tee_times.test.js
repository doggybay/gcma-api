const request = require("supertest");
const { app } = require("../../server");
const knex = require("../../db/knex");
const TeeTime = require('../../models/Tee_Time')

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
    it('should fetch all the teetimes successfully', async () => {
      //Arrange

      //Act
      const res = await request(app).get('/api/teetimes')

      //Assert
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(500)
    })
  })

  describe('get one teetime', () => {
    it('should fetch one teetime successfully', async () => {
      //Arrange
      const id = 10

      //Act
      const res = await request(app).get(`/api/teetimes/${id}`)

      //Assert
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('time')
      
    })
  })

  describe('add a new teetime', () => {
    it('should add a new teetime if it does not exist or add existing teetime and customer to the join table successfully', async () => {
      //Arrange
      const newTime = new Date()

      const newTeetime = {
        time: newTime,
        customer_id: 1
      }

      //Act
      const res = await request(app).post('/api/teetimes').send(newTeetime)

      //Assert
      //Test response
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('time')

      //Test database
      if (res.body.id > 500) {

        //Test for teetime add to db
        const theTeeTime = await TeeTime.query().findById(501)
        expect(theTeeTime.time.toISOString()).toEqual(newTime.toISOString())

        //Test for join table add
        const custTeetimes = await knex("customers_tee_times")
        const custTeetime = custTeetimes.find(custTeetime => custTeetime.id === 1001)
        expect(custTeetime.customer_id).toEqual(newTeetime.customer_id)
        expect(custTeetime.tee_time_id.toISOString()).toEqual(
          newTeetime.toISOString()
        )
      } else {
        //Test for join table add
        const custTeetimes = await knex('customers_tee_times')
        const custTeetime = custTeetimes.find(custTeetime => custTeetime.id === 1001)
        expect(custTeetime.customer_id).toEqual(newTeetime.customer_id)
        expect(custTeetime.tee_time_id.toISOString()).toEqual(newTeetime.toISOString())
      }

    })
  })

  // describe('update one existing customer', () => {
  //   it('should update one existing customer successfully', async () => {
  //     //
  //     const id = 300
  //     const updatedCustomer = {
  //       name: "Applesauce"
  //     }

  //     const res = await request(app).patch(`/api/customers/${id}`).send(updatedCustomer)

  //     expect(res.status).toEqual(200)
  //     expect(res.body.name).toEqual('Applesauce')

  //     const customers = await knex('customers')
  //     const expectedCustomer = customers.find(cust => cust.id === id)
  //     expect(expectedCustomer.name).toEqual("Applesauce")
  //   })
  // })

  describe('remove one teetime', () => {
    it('should remove one teetime successfully', async () => {
      const id = 2
      const res = await request(app).delete(`/api/teetimes/${id}`)

      expect(res.status).toEqual(200)
      expect(res.body.name).toEqual("Lucas Duke")

      const s = await TeeTime.query()
      expect(s).toHaveLength(299)
    })
  })

})