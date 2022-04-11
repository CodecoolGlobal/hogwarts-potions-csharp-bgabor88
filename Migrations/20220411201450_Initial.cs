using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HogwartsPotions.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Capacity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HouseType = table.Column<byte>(type: "tinyint", nullable: false),
                    PetType = table.Column<byte>(type: "tinyint", nullable: false),
                    RoomID = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Students_Rooms_RoomID",
                        column: x => x.RoomID,
                        principalTable: "Rooms",
                        principalColumn: "ID");
                });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "ID", "Capacity" },
                values: new object[,]
                {
                    { 1L, 2 },
                    { 2L, 2 },
                    { 3L, 2 }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "ID", "HouseType", "Name", "PetType", "RoomID" },
                values: new object[,]
                {
                    { 1L, (byte)0, "Marika", (byte)1, null },
                    { 2L, (byte)0, "Sanyi", (byte)1, null },
                    { 3L, (byte)0, "Bélus", (byte)1, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_RoomID",
                table: "Students",
                column: "RoomID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Rooms");
        }
    }
}
