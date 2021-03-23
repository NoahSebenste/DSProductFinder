using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreScannerLibrary
{
    public static class EbayStoreScanner
    {
        public static List<EbayItem> GenerateList()
        {
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


    }
}
