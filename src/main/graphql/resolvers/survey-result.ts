import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/sruvey-result/load-survey-result/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/sruvey-result/save-survey-result/save-survey-controller-factory'

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) => await adaptResolver(makeLoadSurveyResultController(), args, context)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => await adaptResolver(makeSaveSurveyResultController(), args, context)
  }
}
