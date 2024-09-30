<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\TodoRepository;

#[Route('/api/todo', name: 'app_todo')]
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository){
        $this->entityManager  = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'app_todo')]
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();

        $arrOfTodos = [];

        foreach($todos as $todo){
            $arrOfTodos[] = $todo->toArray();
        }
        return $this->json($arrOfTodos);
    }
}
