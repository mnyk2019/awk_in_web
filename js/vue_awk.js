// Vue.config.devtools = true

var stdin_text =
`apple 10
grape 20
melon 30
lemon 40
apple 50
grape 60
melon 70
lemon 80
watermelon 90
pineapple 100`

var sample_list = [
    { title: 'all column', script: '{print}' },
    { title: 'select column', script: '{print $1}' },
    { title: 'text', script: '{print "this is a " $1 "."}' },
    { title: 'if', script: '{if($1=="apple") print}' },
    { title: 'if-else', script: '{if($1=="apple") print "APPLE"; else print "NOT APPLE"}' },
    { title: 'and', script: '{if($2>=30 && $2<=60) print}' },
    { title: 'or', script: '{if($1=="apple" || $1=="melon") print}' },
    { title: 'BEGIN-END', script: 'BEGIN {print "==BEGIN=="}; {print}; END {print "==END=="}' },
    { title: 'NF(col number)', script: '{print NF,$(NF-1),$NF}' },
    { title: 'NR(row number)', script: '{print NR}' },
    { title: 'sum', script: 'BEGIN {sum=0}; {sum+=$2}; END {print sum}' },
    { title: 'sum if', script: 'BEGIN {sum=0}; {if($1=="apple") sum+=$2}; END {print sum}' },
    { title: 'average', script: 'BEGIN {sum=0}; {sum+=$2}; END {print sum/NR}' },
    { title: 'regex', script: '{if($1 ~ /^.*melon$/) print}' },
    { title: 'escape', script: '{print "{" $1 "}" "\\"" $1 "\\""}' },
    { title: 'calc', script: '{print $1,$2*2}' },
    { title: 'substr', script: '{print substr($1,0,1)}' },
    { title: 'gsub', script: '{gsub(/melon/,"MELON",$1); print}' },
    { title: 'to csv', script: 'BEGIN {OFS=","}; {print $1,$2}' },
    { title: 'from csv', script: 'BEGIN {FS=",";OFS=","}; {print $1,$2}' },
    { title: 'group count', script: '{count[$1]+=1}; END { for(key in count){print key, count[key]} }' },
]

var vm_main = new Vue({
    el: '#component_main',
    data: {
        // model
        awk_text: '{print $0}',
        stdin_text: stdin_text,
        // value
        is_error: false,
        sample_list: sample_list,
        show_sample: true,
    },
    computed: {
        computed_awk: function () {
            this.is_error = false

            // 監視オブジェクト
            var awk_text = this.awk_text
            var stdin_text = this.stdin_text

            if (!awk_text || !stdin_text) return ""
            // awk実行
            var result = window.run_web_awk(awk_text, stdin_text)
            if (result.exit_code !== 0) {
                this.is_error = true
                return "Error: " + result.stdout.slice(28)
            }
            return result.stdout
        },
    },
    methods: {
        sample_button_click: function (obj) {
            this.awk_text = obj.script
        }
    },
    watch: {},
});



