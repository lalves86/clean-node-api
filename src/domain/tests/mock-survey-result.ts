import faker from 'faker'
import { SaveSurveyResult, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid(),
  answer: faker.random.word(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    count: faker.datatype.number({ min: 0, max: 100 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }, {
    answer: faker.random.word(),
    image: faker.random.image(),
    count: faker.datatype.number({ min: 0, max: 100 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }],
  date: faker.date.recent()
})

export const mockEmptySurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }, {
    answer: faker.random.word(),
    image: faker.image.imageUrl(),
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }],
  date: faker.date.recent()
})
