namespace WebAPI.Models.DTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
       
        public string CategoryName { get; set; }
        public List<EventPostDTO> EventPosts { get; set; }
    }
}
