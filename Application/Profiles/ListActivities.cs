using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Profiles
{
    public class ListActivities
    {
     

        public class Query : IRequest<Result<List<UserActivityDto>>>{
            public string Predicate { get; set; }

        public string Username { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _mapper = mapper;
            _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var query = _context.ActivityAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Activity.Date)
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();


                
                 if(request.Predicate =="past")
                 {
                    query = query.Where(x=>x.Date <= DateTime.Now);
                 }
                
               else if(request.Predicate =="hosting")
                {
                    query = query.Where(a=>a.HostUsername ==_userAccessor.GetUsername());
                }
                else {
                    query = query.Where(x=>x.Date>= DateTime.Now);
                }

                var activities = await query.ToListAsync();

                

               return Result<List<UserActivityDto>>.Success(
    activities);

                
            }
        }
    }
}