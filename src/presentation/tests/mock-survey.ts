import faker from 'faker'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModels } from '@/domain/tests'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurvey.Params

  async add (data: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveyModels)
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  result = [
    faker.random.word(),
    faker.random.word()
  ]

  id: string

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}
