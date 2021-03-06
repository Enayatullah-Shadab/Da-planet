import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GalaxiesService {
  async getAll(query = {}) {
    return await dbContext.Galaxies.find(query)
  }

  async getById(id) {
    const galaxy = await dbContext.Galaxies.findById(id)
    if (!galaxy) {
      throw new BadRequest('Invalid')
    }
  }

  async create(body) {
    return await dbContext.Galaxies.create(body)
  }

  async edit(body) {
    await this.getById(body.id)
    const galaxy = await dbContext.Galaxies.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
  }

  async destroy(id) {
    await this.getById(id)
    return await dbContext.Galaxies.findByIdAndDelete()
  }
}
export const galaxiesService = new GalaxiesService()
