using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StoreScannerLibrary;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : ControllerBase
    {
        public StoreController()
        {
        }


        //can be called by https://localhost:5001/api/Store
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EbayItem>>> GetItems()
        {


            return await Task.Run(() => EbayStoreScanner.GenerateList());
        }


        /*
        //can be called by https://localhost:5001/api/Store

        [HttpGet]
        public ActionResult<IEnumerable<string>> Test()
        {


            return new string[] {"value1", "value2", "value3"};
        }

        

        public static List<EbayItem> GenerateList()
        {
            StoreScannerLibrary.EbayItem e = new StoreScannerLibrary.EbayItem();
            List<EbayItem> items = new List<EbayItem>();
            items.Add(new EbayItem
            {
                name = "lawn mower",
                price = 26.99,
                numberSold = 3
            });
            items.Add(new EbayItem
            {
                name = "flower pot",
                price = 14.99,
                numberSold = 4
            });


            return items;
        }
        */


    }
}