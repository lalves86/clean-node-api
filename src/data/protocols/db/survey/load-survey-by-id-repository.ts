import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyByIdRepository {
  loadById: (is: string) => Promise<SurveyModel>
}
