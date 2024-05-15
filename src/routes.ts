import {Router, Request, Response} from 'express';
const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    res.status(200).json({ message: "Rota de teste"});
});

export { router };

