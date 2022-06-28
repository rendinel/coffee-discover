import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from '../../lib/airtable'

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query
  try {
    if (id) {
      // const findCoffeeStoredRecords = await table
      //   .select({
      //     filterByFormula: `id="${id}"`,
      //   })
      //   .firstPage()
      // if (findCoffeeStoredRecords.length !== 0) {
      //   const records = getMinifiedRecords(findCoffeeStoredRecords)
      //   res.json(records)
      // } else {
      //   res.json({ message: `id could not be found` })
      // }
      const records = await findRecordByFilter(id)
      if (records.length !== 0) {
        res.json(records)
      } else {
        res.json({ message: `id could not be found` })
      }
      res.json({ message: `id is created ${id}` })
    } else {
      res.status(400)
      res.json({ message: 'Id is missing' })
    }
  } catch (error) {
    res.status(500)
    res.json({ message: 'Something went wrong', error })
  }
}

export default getCoffeeStoreById
