import axios from 'axios'

// Giải pháp Clean code gọn gàng đó là chúng ta sẽ catch lỗi tập trinh tại một nơi bằng cách tận dụng một thứ cực kỳ mạnh mẽ trong axios đó là Interceptors
// Hiểu đơn giản Interceptors là cách mà chugns ta sẽ đánh chặn vào giữa request hoặc response để xử lý login mà chúng ta muốn
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`http://localhost:8017/v1/boards/${boardId}`)

  return response.data
}