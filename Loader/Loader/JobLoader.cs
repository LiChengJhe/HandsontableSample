using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Loader
{
    public class JobProp
    {
        public string Path { get; set; }
        public string JobName { get; set; }
        public string TypeName { get; set; }
        public string MethodName { get; set; }
        public object[] Params { get; set; }
    }
    public class JobLoader
    {
        public static void Execute(JobProp prop)
        {

            AppDomainSetup appDomainSetup = new AppDomainSetup
            {
                ApplicationBase = System.Environment.CurrentDirectory,
                 ShadowCopyDirectories=$"{System.Environment.CurrentDirectory}",
                  ShadowCopyFiles=true.ToString().ToLower(),
                  PrivateBinPath = "dll"
            };

            AppDomain appDomain = AppDomain.CreateDomain(prop.JobName, null, appDomainSetup);

 


            AssemblyLoader assemblyLoader = (AssemblyLoader)appDomain.CreateInstanceAndUnwrap(typeof(AssemblyLoader).Assembly.FullName, typeof(AssemblyLoader).FullName);
            Assembly assembly = assemblyLoader.GetAssembly(prop.Path);
            Type assemblyType = assembly.GetType(prop.TypeName);
            MethodInfo assemblyMethod = assemblyType.GetMethod(prop.MethodName);
            var assemblyInstance = Activator.CreateInstance(assemblyType);
            Console.WriteLine(assemblyMethod.Invoke(assemblyInstance, prop.Params));
      
            AppDomain.Unload(appDomain);
 
        }
    }
    public class AssemblyLoader : MarshalByRefObject
    {
        public Assembly GetAssembly(string assemblyPath)
        {
            Assembly assembly =  Assembly.Load(File.ReadAllBytes(assemblyPath));
            return assembly;

        }
    }
}
