import Mockdate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { noContent, ok, serverError } from '../../../helper/http/http-helper'
import { throwError } from '@/domain/tests'
import { LoadSurveysSpy } from '@/presentation/tests'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    await sut.handle({})
    expect(loadSurveysSpy.callsCount).toBe(1)
  })

  test('should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(loadSurveysSpy.surveyModels))
  })

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModels = []
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
