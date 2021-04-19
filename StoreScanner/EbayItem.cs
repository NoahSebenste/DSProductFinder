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
        public ICollection<SoldData> soldData {get;set;}

        public override string ToString()
        {
            string soldDataString = "";
            foreach (SoldData sold in soldData)
            {
                soldDataString += "Quantity Sold: " + sold.quantitySold + " Date: " + sold.dateSold + "\n";
            }

            return "Name: " + name + "\n"
                 + "Price: " + price + "\n"
                 + "Url: " + url + "\n"
                 + "Number sold: " + numberSold + "\n"
                 + "Img url: " + imgUrl + "\n"
                 + soldDataString;
        }
    }
}
