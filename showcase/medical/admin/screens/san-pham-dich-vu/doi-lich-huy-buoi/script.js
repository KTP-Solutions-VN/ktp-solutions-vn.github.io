
  document.getElementById('actionSelect').addEventListener('change', function () {
    var isCancel = this.value === 'cancel';
    document.getElementById('newSlotField').style.display = isCancel ? 'none' : 'flex';
    document.getElementById('reasonField').style.display = isCancel ? 'flex' : 'none';
  });
  document.getElementById('confirmBtn').addEventListener('click', function () { window.location.href = '../../../screens/san-pham-dich-vu/cau-hinh-lich-slot-phan-cong-nhan-su/index.html'; });
  