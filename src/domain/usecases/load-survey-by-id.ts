import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  loadbyId: (id: string) => Promise<SurveyModel>
}
