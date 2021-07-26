import faker from 'faker'
import { DbCheckSurveyById } from './db-check-survey-by-id'
import { throwError } from '@/domain/tests'
import { CheckSurveyByIdRepositorySpy } from '@/data/tests'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)
  return {
    sut,
    checkSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbCheckSurveyById', () => {
  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  test('should call CheckSurveyByIdRepository', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    await sut.checkById(surveyId)
    expect(checkSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('should return true if CheckSurveyByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const surveyExists = await sut.checkById(surveyId)
    expect(surveyExists).toBe(true)
  })

  test('should return false if CheckSurveyByIdRepository returns false', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    checkSurveyByIdRepositorySpy.result = false
    const surveyExists = await sut.checkById(surveyId)
    expect(surveyExists).toBe(false)
  })

  test('should throw if CheckSurveyByIdRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
