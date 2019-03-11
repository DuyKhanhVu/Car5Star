function Post() {
    console.log("script");
    function bindEvent() {
        $(".car-update").click(function (e) {
            var params = {
                id: $(".id").val(),
                name: $(".name").val(),
                brand: $(".brand").val(),
                exterior_color: $(".exterior_color").val(),
                seating: $(".seating").val(),
                price: $(".price").val(),
                description: $(".description").val(),
            };
            alert(JSON.stringify(params));
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                url: base_url + "/admin/car-manager/update-car",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            });
        });
        $(".car_delete").click(function (e) {
            var car_id = $(this).attr("car_id");
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                url: base_url + "/admin/car-manager/delete",
                type: "DELETE",
                data: { id: car_id },
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            });
        });
    }
    bindEvent();
}

$(document).ready(function () {
    new Post();
});