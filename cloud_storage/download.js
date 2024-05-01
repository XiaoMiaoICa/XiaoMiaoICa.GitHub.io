window.onload = function() {
    var fileList = document.getElementById('fileList');
    var downloadSwitch = document.getElementById('downloadSwitch');
    var switchStatus = document.getElementById('switchStatus');

    // 发送 AJAX 请求获取文件列表
    function getFileList(path) {
        // 使用 GitHub Pages 上的文件路径
        var baseUrl = 'https://xiaomiaoica.github.io/';
        var url = baseUrl + path;

        fetch(url)
        .then(response => response.json())
        .then(files => {
            // 清空文件列表
            fileList.innerHTML = '';
            // 遍历文件列表并创建列表项
            files.forEach(function(file) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                if (file.type === 'dir') {
                    a.setAttribute('href', '#');
                    a.addEventListener('click', function() {
                        getFileList(file.path);
                    });
                    // 在文件夹名称末尾加上“(文件夹)”标记
                    a.textContent = file.name + '（文件夹）';
                } else {
                    if (downloadSwitch.checked) {
                        // 使用 GitHub Pages 上的文件链接
                        a.setAttribute('href', baseUrl + file.path);
                    } else {
                        // 使用本地下载链接
                        a.setAttribute('href', 'download.php?file=' + encodeURIComponent(file.path.replace(/\//g, '//')));
                    }
                    a.textContent = file.name;
                }
                li.appendChild(a);
                fileList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('获取文件列表失败：', error);
        });
    }

    // 添加事件监听器以响应开关状态变化
    downloadSwitch.addEventListener('change', function() {
        if (this.checked) {
            switchStatus.textContent = 'GITHUB节点';
        } else {
            switchStatus.textContent = '本地';
        }
        // 重新加载文件列表
        getFileList('');
    });

    // 初始加载文件列表
    getFileList('');
};
