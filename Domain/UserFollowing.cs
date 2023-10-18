namespace Domain
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }

        public AppUser Observer { get; set; }

        public string TargetID { get; set; }

        public AppUser Target { get; set; }
    }
}