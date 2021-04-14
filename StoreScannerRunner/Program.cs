using StoreScannerLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreScannerRunner
{
    class Program
    {
        static void Main(string[] args)
        {
            string testString = @"https://www.ebay.com/sch/dawn36438/m.html?_nkw=&_armrs=1&_ipg=&_from=";
            EbayStoreScanner.TestWeb();
            Console.ReadLine();
        }
    }
}
