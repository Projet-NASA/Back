import { Router } from 'express'

import { userTest, getHello } from '../Controller/testController'

const routerTest = Router()

routerTest.get('/', getHello)
routerTest.post('/addUser', userTest)

export default routerTest