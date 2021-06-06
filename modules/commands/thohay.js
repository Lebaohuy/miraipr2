var fetch = global.nodemodule["node-fetch"];

var thohay = function thohay(type, data) {
	(async function () {
		var returntext = `Nhân chi sơ bất chi tồn , sống như l*n cứ tưởng mình hay
		
Vỏ quýt dày , có con dao nhọn
		
Gọi zú e là trái cam ,Vì a sẽ là trần quốc toản
		
Chú bé loắt choắt,
Cái xắc xinh xinh,
Cái chân thoăn thoắt,
Cái đầu cắt moi, 
		
Có không giữ , mất là do không giữ 
		
Đi một ngày đàn 
Tốn 80 nghìn tiền xăng
		
Điếu thuốc tàn , anh mồi thêm điếu nữa 
Unfrien rồi đéo acp lại đâu con
		
Đầu lòng hai ả tố nga 
Thúy Kiều là chị 
Em là bad girl trong bộ váy ngắn 
Ăn chơi ngoài đường không sợ cháy nắng...`;
		return {
			handler: "internal",
			data: returntext
		}
	})().then(function (returndata) {
		data.return(returndata);
	});
} 

function onLoad(data) {

var onLoadText = "Loaded \"thohay\"mod lại của by Wua'n";

data.log(onLoadText);

}
module.exports = {
	thohay: thohay
}