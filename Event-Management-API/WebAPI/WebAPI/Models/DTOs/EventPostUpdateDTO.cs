using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.DTOs
{
    public class EventPostUpdateDTO
    {
        [Required]
        public int Id { get; set; }
        
        [MaxLength(30)]
        public string? EventName { get; set; }
       
        public string? EventDescription { get; set; }
        
        public string? Location { get; set; }
      
        public DateTime? CreatedDate { get; set; }
       
        public DateTime? EndDate { get; set; }
        
       
        public string? ProductImage { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
