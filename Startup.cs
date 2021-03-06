using System.Text.Json.Serialization;
using HogwartsPotions.Helper;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Interfaces;
using HogwartsPotions.Models.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace HogwartsPotions;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

        services.AddCors();
        services.AddDbContext<HogwartsContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        services.AddControllersWithViews()
            .AddJsonOptions(opt => opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
        services.AddScoped<IStudentRepository, StudentRepository>();
        services.AddScoped<IRoomRepository, RoomRepository>();
        services.AddScoped<IPotionRepository, PotionRepository>();
        services.AddScoped<IRecipeRepository, RecipeRepository>();
        services.AddScoped<IIngredientRepository, IngredientRepository>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, HogwartsContext context)
    {
        if (env.IsDevelopment())
        {
            if (!context.Database.EnsureCreated())
            {
                context.Database.Migrate();
            }
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseCors(op =>
        {
            op.WithOrigins("http://localhost:3000/")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
        });

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();


        app.UseAuthorization();

        app.UseMiddleware<JwtMiddleware>();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}