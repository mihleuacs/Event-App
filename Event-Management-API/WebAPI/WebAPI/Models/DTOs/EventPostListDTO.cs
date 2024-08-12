using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.DTOs
{
    public class EventPostListDTO
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string? EventName { get; set; }
        [Required]
        public string? EventDescription { get; set; }
        [Required]
        public string? Location { get; set; }
        [Required]
        public DateTime? CreatedDate { get; set; }
        [Required]
        public DateTime? EndDate { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        [Required]
        public string ImageFile { get; set; }
    }
}
