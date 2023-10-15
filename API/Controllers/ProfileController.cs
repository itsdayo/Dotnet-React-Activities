using Application.Photos;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController: BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult>GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query{UserName= username}));
        }

        [HttpDelete(("{id}"))]
        public async Task<IActionResult> Delete(string id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
        [HttpPost(("{id}/setMain"))]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command{Id= id}));
        }
        [HttpPut]
            public async Task<IActionResult> Edit(Edit.Command command)
            {
                return HandleResult(await Mediator.Send(command));
            }

    }
}