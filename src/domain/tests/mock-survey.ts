import faker from 'faker'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(),
    answers: [{
      answer: faker.random.word()
    }, {
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }],
    date: faker.date.recent()
  }
}

export const mockSurveyModels = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel()
]

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: faker.date.recent()
})
