using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$", ErrorMessage= "Password must be more than 7 characters, contain a specical character, digit, lowercase letter and uppercase letter")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }

        public string Username { get; set; }
    }
}