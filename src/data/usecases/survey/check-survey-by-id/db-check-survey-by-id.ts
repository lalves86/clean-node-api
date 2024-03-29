import { CheckSurveyById, CheckSurveyByIdRepository } from './db-check-survey-by-id-protocols'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository) {}

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    const result = await this.checkSurveyByIdRepository.checkById(id)
    return result
  }
}
