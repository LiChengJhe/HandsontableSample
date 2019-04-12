using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Loader
{
    class Program
    {
        static void Main(string[] args)
        {
            Observable.Interval(TimeSpan.FromSeconds(10)).Subscribe((i) =>
            {
                JobLoader.Execute(
                     new JobProp
                     {
                         JobName = "Test",
                         Path = $"C:\\Users\\ChengjheLi\\Desktop\\Loader\\Loader\\bin\\Debug\\dll\\Job.dll",
                         MethodName = "Get",
                         TypeName = "Job.Test"
                     });
     
            });


            Console.ReadKey();
        }
    }
}
