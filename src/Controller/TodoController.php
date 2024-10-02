<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\TodoRepository;
use App\Entity\Todo;

#[Route('/api/todo', name: 'app_todo')]
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository){
        $this->entityManager  = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'app_todo_read')]
    public function read(): Response
    {
        $todos = $this->todoRepository->findAll();

        $arrOfTodos = [];

        foreach($todos as $todo){
            $arrOfTodos[] = $todo->toArray();
        }
        return $this->json($arrOfTodos);
    }

    #[Route('/create', name: 'app_todo_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);

        if (!$content || !isset($content['name'])) {
            return $this->json(['error' => 'Invalid input'], Response::HTTP_BAD_REQUEST);
        }

        $todo = new Todo();
        $todo->setName($content['name']);

        $this->entityManager->persist($todo);
        $this->entityManager->flush();

        return $this->json(['message' => 'Todo created successfully'], Response::HTTP_CREATED);
    }

    #[Route('/delete', name: 'app_todo_delete', methods: ['POST'])]
    public function delete(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
    
        if (!$content || !isset($content['id'])) {
            return $this->json(['error' => 'Invalid input'], Response::HTTP_BAD_REQUEST);
        }
    
        $todo = $this->todoRepository->find($content['id']);
    
        if (!$todo) {
            return $this->json(['error' => 'Todo not found'], Response::HTTP_NOT_FOUND);
        }
    
        $this->entityManager->remove($todo);
        $this->entityManager->flush();
    
        return $this->json(['message' => 'Todo deleted successfully'], Response::HTTP_OK);
    }

    #[Route('/update', name: 'app_todo_update', methods: ['POST'])]
    public function update(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
    
        if (!$content || !isset($content['id']) || !isset($content['name'])) {
            return $this->json(['error' => 'Invalid input'], Response::HTTP_BAD_REQUEST);
        }

        $todo = $this->todoRepository->find($content['id']);
    
        if (!$todo) {
            return $this->json(['error' => 'Todo not found'], Response::HTTP_NOT_FOUND);
        }
    
        $todo->setName($content['name']);
  
        $this->entityManager->flush();
    
        return $this->json(['message' => 'Todo updated successfully'], Response::HTTP_OK);
    }
    
}
