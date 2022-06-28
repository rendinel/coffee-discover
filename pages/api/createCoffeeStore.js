import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from '../../lib/airtable'
// const Airtable = require('airtable')
// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
//   process.env.AIRTABLE_BASE_KEY
// )

// const table = base('coffee-stores')

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body
    try {
      if (id) {
        // const findCoffeeStoredRecords = await table
        //   .select({
        //     filterByFormula: `id="${id}"`,
        //   })
        //   .firstPage()
        // if (findCoffeeStoredRecords.length !== 0) {
        //   const records = findCoffeeStoredRecords.map((record) => {
        //     return {
        //       ...record.fields,
        //     }
        //   })
        //   const records = getMinifiedRecords(findCoffeeStoredRecords)
        //   res.json(records)
        const records = await findRecordByFilter(id)
        if (records.length !== 0) {
          res.json(records)
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ])
            // const records = createRecords.map((record) => {
            //   return {
            //     ...record.fields,
            //   }
            // })
            const records = getMinifiedRecords(createRecords)
            res.json({ message: 'create a record', records: records })
          } else {
            res.status(400)
            res.json({ message: 'Name is missing' })
          }
        }
      } else {
        res.status(400)
        res.json({ message: 'Id is missing' })
      }
    } catch (err) {
      console.error('Error creating or finding store', err)
      res.status(500)
      res.json({ message: 'Error creating or finding store', err })
    }
  }
}

export default createCoffeeStore
