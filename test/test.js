var should = require('should')
describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //这里obj调用say,所以this指向obj
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global)
    }
    test()   //默认指向全局
  })

  describe('bind', function () {
    it('bind undefined', function () {

      // 相当于这样的顺序
      // 1 
      // var obj;
      // 2
      // function _say(){
      //   this.should.equal(global)
      // }
      // 3
      // _say.bind(obj)    这时obj为undifined
      // 4 自执行函数执行完之后obj才有值
      // 5 obj.say()

      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
          }
          return _say.bind(obj)
        }() 
      }
      obj.say()
    })



    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // obj已经声明
          this.should.equal(obj)
        }
        return _say.bind(obj)  //这时obj = {}
      }()
      obj.say()
    })
  })
})