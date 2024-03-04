import { Router } from 'express'

import { getHello } from '../Controller/testController'

const router = Router()

router.get('/', getHello)

export default router