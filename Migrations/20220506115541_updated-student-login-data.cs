using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HogwartsPotions.Migrations
{
    public partial class updatedstudentlogindata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLoginDatas_Students_StudentId",
                table: "UserLoginDatas");

            migrationBuilder.DropIndex(
                name: "IX_UserLoginDatas_StudentId",
                table: "UserLoginDatas");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Students");

            migrationBuilder.AddColumn<long>(
                name: "UserLoginDataId",
                table: "Students",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserLoginDatas_StudentId",
                table: "UserLoginDatas",
                column: "StudentId",
                unique: true,
                filter: "[StudentId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLoginDatas_Students_StudentId",
                table: "UserLoginDatas",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLoginDatas_Students_StudentId",
                table: "UserLoginDatas");

            migrationBuilder.DropIndex(
                name: "IX_UserLoginDatas_StudentId",
                table: "UserLoginDatas");

            migrationBuilder.DropColumn(
                name: "UserLoginDataId",
                table: "Students");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Students",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserLoginDatas_StudentId",
                table: "UserLoginDatas",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLoginDatas_Students_StudentId",
                table: "UserLoginDatas",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");
        }
    }
}
