import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue = []) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue
        ? JSON.parse(storedValue)
        : [
            {
              id: 0,
              title: "Оптимизация алгоритма сортировки",
              description:
                "Необходимо улучшить производительность алгоритма сортировки для больших массивов данных. Исходный код использует стандартную быструю сортировку (QuickSort), но на данных размером более 1 млн элементов наблюдаются задержки. Требуется проанализировать алгоритм, выявить узкие места и предложить оптимизации (например, гибридный подход с MergeSort или параллельную обработку).",
              status: { slug: "in_progress", value: "В процессе" },
            },
            {
              id: 1,
              title: "Разработка REST API для управления задачами",
              description:
                "Создать backend-приложение на Python (Django/Flask) или Node.js, которое предоставляет RESTful API для управления списком задач (CRUD). API должно включать аутентификацию пользователей, валидацию данных и логирование запросов.",
              status: { slug: "paused", value: "На паузе" },
            },
            {
              id: 2,
              title: "Поиск утечек памяти в приложении на C++",
              description:
                "В проекте на C++ возникают утечки памяти, приводящие к постепенному увеличению потребления RAM. Необходимо подключить инструменты (Valgrind, AddressSanitizer) для диагностики, найти участки кода с неосвобожденной памятью и исправить ошибки.",
              status: { slug: "completed", value: "Завершен" },
            },
            {
              id: 3,
              title: "Рефакторинг легаси-кода на Java",
              description:
                "В устаревшем модуле Java-приложения используется спагетти-код с дублированием логики и отсутствием unit-тестов. Задача — провести рефакторинг: разбить код на модули, применить паттерны (например, Strategy или Factory), написать тесты (JUnit).",
              status: { slug: "canceled", value: "Отменен" },
            },
            {
              id: 4,
              title: "Реализация чат-бота на Python с NLP",
              description:
                "Разработать Telegram-бота на Python (библиотека aiogram), который понимает естественный язык (NLP, библиотека nltk/spaCy) и отвечает на вопросы пользователей о погоде, курсе валют или новостях. Интеграция с внешними API (OpenWeatherMap, ЦБ РФ).",
              status: { slug: "initial", value: "Начальный" },
            },
          ];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, tasks]);

  const getStatus = (status) => {
    status = status.split(":");

    return {
      slug: status[0],
      value: status[1],
    };
  };

  const dataTask = (id, title, description, status) => {
    return {
      id: id,
      title: title,
      description: description,
      status: getStatus(status),
    };
  };

  const addTask = (title, description, status) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      dataTask(prevTasks.length, title, description, status),
    ]);
  };

  const updateTask = (id, updatedTask) => {
    if (updatedTask?.status) {
      updatedTask.status = getStatus(updatedTask.status);
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useLocalStorage;
