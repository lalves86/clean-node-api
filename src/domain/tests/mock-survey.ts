import faker from 'faker'
import { AddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '@/data/usecases/survey/load-answers-by-survey/db-load-answers-by-survey-protocols'

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

export const mockAddSurveyParams = (): AddSurvey.Params => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: faker.date.recent()
})
