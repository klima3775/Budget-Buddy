const getErrorStyle = (error: boolean) => ({
  borderColor: error ? "red" : "inherit",
}); // Функция для изменения стиля в зависимости от наличия ошибки винести в отдельный файл

export default getErrorStyle; // Экспорт функции для изменения стиля в зависимости от наличия ошибки
