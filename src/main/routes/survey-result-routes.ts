import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSaveSurveyResultController } from '../factories/controllers/sruvey-result/save-survey-result/save-survey-controller-factory'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', adminAuth, adaptRoute(makeSaveSurveyResultController()))
}
