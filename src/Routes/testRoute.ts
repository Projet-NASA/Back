import { Router } from 'express'

import { addUserTest, getHello } from '../Controller/testController'

const router = Router()

router.get('/', getHello)
router.post('/addUser', addUserTest)

export default router