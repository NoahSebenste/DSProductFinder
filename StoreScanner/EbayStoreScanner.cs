using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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
                name = "MASH - Season 2 (DVD, 2002, 3-Disc Set, Collector&#039;s Edition) - Free Shipping",
                price = 26.99,
                numberSold = 3,
                url = @"https://www.ebay.com/itm/MASH-Season-2-DVD-2002-3-Disc-Set-Collectors-Edition-Free-Shipping/224336621471?hash=item343b812f9f:g:uXsAAOSwbqlgGKtg",
                imgUrl = @"https://i.ebayimg.com/thumbs/images/g/uXsAAOSwbqlgGKtg/s-l225.jpg"
            });
            items.Add(new EbayItem
            {
                name = "MASH - Season 2 (DVD, 2002, 3-Disc Set, Collector&#039;s Edition) - Free Shipping",
                price = 26.99,
                numberSold = 3,
                url = @"https://www.ebay.com/itm/MASH-Season-2-DVD-2002-3-Disc-Set-Collectors-Edition-Free-Shipping/224336621471?hash=item343b812f9f:g:uXsAAOSwbqlgGKtg",
                imgUrl = @"https://i.ebayimg.com/thumbs/images/g/uXsAAOSwbqlgGKtg/s-l225.jpg"
            });


            return items;
        }

        private static HtmlDocument SafeLoad(HtmlWeb web, string html)
        {
            HtmlDocument document;
            try
            {
                document = web.Load(html);
            }
            catch
            {
                Console.WriteLine("retrying safe load");
                Thread.Sleep(100);
                return SafeLoad(web, html);
            }

            return document;
        }

        public static List<EbayItem> TestWeb(string storeUrl = @"https://www.ebay.com/sch/mollitiamstudios/m.html?_nkw=&_armrs=1&_ipg=&_from=")
        {

            HtmlWeb web = new HtmlWeb();
            HtmlDocument document = SafeLoad(web, storeUrl);

            //get pagination table and link
            HtmlNode table = document.DocumentNode.SelectSingleNode("//table[@class='pagn pagn-m']//td[@class='pages']");
            HtmlNode[] pageLinks = table.SelectNodes(".//a").ToArray();
            //get link urls
            List<string> pageHrefs = new List<string>();
            foreach (HtmlNode pageLink in pageLinks)
            {
                pageHrefs.Add(pageLink.Attributes["href"].Value);
            }

            List<EbayItem> ebayItems = InitializeList(pageHrefs.ToArray());

            foreach (EbayItem ebayItem in ebayItems)
            {
                Console.WriteLine("Populating item");
                PopulateItem(ebayItem);
            }

            foreach (EbayItem item in ebayItems)
            {
                Console.WriteLine(item);
                Console.WriteLine();
            }


            return ebayItems;
        }

        /// <summary>
        /// Initializes a list of Ebay Items with their src url and image across all pages of a given store.
        /// </summary>
        /// <param name="pageLinks"></param>
        /// <returns></returns>
        public static List<EbayItem> InitializeList(string[] pageLinks)
        {
            List<EbayItem> ebayItems = new List<EbayItem>();
            foreach (string pageLink in pageLinks)
            {
                HtmlWeb web = new HtmlWeb();
                HtmlDocument document = SafeLoad(web, pageLink);//web.Load(pageLink);

                HtmlNode[] nodes = document.DocumentNode.SelectNodes("//a[@class='img imgWr2']").ToArray();
                foreach (HtmlNode item in nodes)
                {
                    string hrefValue = item.Attributes["href"].Value;
                    HtmlNode imgNode = item.SelectSingleNode(".//img");
                    string srcValue = imgNode.Attributes["src"].Value;

                    ebayItems.Add(new EbayItem
                    {
                        url = hrefValue,
                        imgUrl = srcValue
                    });
                }
            }

            return ebayItems;
        }

        public static void PopulateItem(EbayItem ebayItem)
        {
            //get the initial html
            HtmlWeb web = new HtmlWeb();
            HtmlDocument document = web.Load(ebayItem.url);


            //gather the name
            HtmlNode nameNode = document.DocumentNode.SelectSingleNode("//h1[@id='itemTitle']");
            //get rid of inner span element
            nameNode.RemoveChild(nameNode.SelectSingleNode(".//span"));
            ebayItem.name = nameNode.InnerText;

            //get the price
            HtmlNode priceNode = document.DocumentNode.SelectSingleNode("//span[@itemprop='price']");
            double price = Double.Parse(priceNode.Attributes["content"].Value);
            ebayItem.price = price;

            //check and populate sold data
            HtmlNode soldNode = document.DocumentNode.SelectSingleNode("//a[@class='vi-txt-underline']");

            if (soldNode != null)
            {
                ebayItem.numberSold = Int32.Parse(soldNode.InnerText.Substring(0, soldNode.InnerText.IndexOf(' ')));

                string soldLink = soldNode.Attributes["href"].Value;
                soldLink = soldLink.Replace("amp;", "");
                document = web.Load(soldLink);

                //gather the date nodes
                HtmlNode[] dateNodes = document.DocumentNode.SelectNodes("//td[@align='left' and @class='contentValueFont' and not(@nowrap)]").ToArray();
                //gather the quantity nodes
                HtmlNode[] quantityNodes = document.DocumentNode.SelectNodes("//td[@align='middle']").ToArray();
                //populate the sold data
                for (int x = 0; x < dateNodes.Length; x++)
                {
                    //Console.WriteLine("Quantity sold: " + quantityNodes[x].InnerText + " Date: " + dateNodes[x].InnerText);
                    ebayItem.soldData.Add(new SoldData
                    {
                        quantitySold = Int32.Parse(quantityNodes[x].InnerText),
                        dateSold = dateNodes[x].InnerText
                    });
                }

            }



        }




    }
}
