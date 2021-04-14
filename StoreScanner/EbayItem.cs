using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreScannerLibrary
{
    public class EbayItem
    {
        public string name { get; set; }
        public double price { get; set; }
        public int numberSold { get; set; }
        public string imgUrl { get; set; }
        public string url { get; set; }
        public List<SoldData> soldData = new List<SoldData>();

        public override string ToString()
        {
            return "Name: " + name + "\n"
                 + "Price: " + price + "\n"
                 + "Url: " + url + "\n" 
                 + "Number sold: " + numberSold + "\n"
                 + "Img url: " + imgUrl;
        }
    }
}
